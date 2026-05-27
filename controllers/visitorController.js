import Visitor from '../models/Visitor.js';

export const registerVisitor = async (req, res) => {
  try {
    const { name, phone, purpose, hostEmployee, company } = req.body;

    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!phone) missingFields.push('phone');
    if (!purpose) missingFields.push('purpose');
    if (!hostEmployee) missingFields.push('hostEmployee');

    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missingFields.join(', ')}`,
      });
    }

    if (typeof phone !== 'string' || !/^[0-9]+$/.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be a valid string of digits',
      });
    }

    // Check if visitor photo is uploaded (security compliance requirement)
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Visitor photo is mandatory as per security compliance policy',
      });
    }

    const visitor = new Visitor({
      name: name.trim(),
      phone: phone.trim(),
      purpose: purpose.trim(),
      hostEmployee,
      company: company ? company.trim() : undefined,
      photo: req.file.path || req.file.filename,
      status: 'pending',
      checkInTime: null,
      checkOutTime: null,
    });

    const createdVisitor = await visitor.save();

    res.status(201).json({
      success: true,
      message: 'Visitor registered successfully',
      visitor: createdVisitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering visitor',
      error: error.message,
    });
  }
};
