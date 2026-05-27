import QRCode from 'qrcode';
import Approval from '../models/Approval.js';
import Visitor from '../models/Visitor.js';

export const updateVisitorStatus = async (req, res) => {
  try {
    const { visitorId, status } = req.body;

    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "approved" or "rejected"',
      });
    }

    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found',
      });
    }

    visitor.status = status;

    if (status === 'approved') {
      visitor.checkInTime = Date.now();

      const qrData = JSON.stringify({
        visitorId: visitor._id,
        status: 'approved',
        visitTime: visitor.checkInTime,
      });

      visitor.qrCode = await QRCode.toDataURL(qrData);
    }

    const updatedVisitor = await visitor.save();

    const approval = new Approval({
      visitorId,
      approvedBy: req.user.id,
      status,
    });

    const approvalLog = await approval.save();

    res.status(200).json({
      success: true,
      message: `Visitor status updated to "${status}" successfully`,
      visitor: updatedVisitor,
      approvalLog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating visitor status',
      error: error.message,
    });
  }
};

