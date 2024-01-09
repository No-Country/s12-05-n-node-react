import Visit from '../models/visit.js';
import { tryCatch } from '../utils/tryCatch.js';
import { sendResponse } from '../utils/responses.js';
import uploadImage from '../utils/images.js';

// Controlador para crear una nueva visita

// the same before but using tryCatch
export const registerVisit = tryCatch(async(req, res) => {
    const {...visitFields } = req.body;
    const requiredAttributes = ['address', 'visitorIdentityNumber', 'visitorFullName', 'state', 'visitType'];
    let checkAllKeys = requiredAttributes.every((i) => visitFields.hasOwnProperty(i));
    if (!checkAllKeys) {
        return sendResponse(res, 400, 'Faltan datos obligatorios');
    }
    const noCheckoutVisit = await Visit.findOne({ visitorIdentityNumber: visitFields.visitorIdentityNumber });
    if (noCheckoutVisit) {
        if (!noCheckoutVisit.hasOwnProperty('checkOut'))
            return sendResponse(res, 400, 'El visitante tiene un ingreso sin salida registrada');
    }
    if (req.files) {
        const { image } = req.files;
        const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!fileTypes.includes(image.mimetype)) sendResponse(res, 400, 'Formatos de imagen soportados: JPG, PNG, JPEG.');
        const images = await uploadImage(image.tempFilePath);
        const visit = new Visit(req.body);
        visit.photo = images.secure_url;
        visit.checkInBy = req.user.userId;
        await visit.save();
        return sendResponse(res, 200, 'Visita registrada con éxito.');
    }
    visitFields.checkInBy = req.user.userId;
    const visit = new Visit(visitFields);

    await visit.save();
    sendResponse(res, 200, 'Visita registrado con éxito');
});

// Controlador para actualizar una visita por ID
export const updateVisit = tryCatch(async(req, res) => {
    const { checkOut, ...otherFields } = req.body;

    // Verificar si hay otros campos presentes en el cuerpo de la solicitud
    if (Object.keys(otherFields).length > 0) {
        return sendResponse(res, 400, 'Solo se permite la actualización de checkOut');
    }
    const userCheckOut = req.user.userId;
    const updatedVisit = await Visit.findByIdAndUpdate(req.params.id, { checkOut: new Date(checkOut), checkOutBy: userCheckOut }, { new: true });
    if (!updatedVisit) {
        return sendResponse(res, 404, 'Visita no encontrada');
    }

    sendResponse(res, 200, 'Visita actualizada con éxito', updatedVisit);
});



// Controlador para obtener todas las visitas
export const getAllVisits = tryCatch(async(req, res) => {
    const visits = await Visit.find().populate({ path: 'checkInBy', select: 'fullName' }).populate({ path: 'checkOutBy', select: 'fullName' });
    sendResponse(res, 200, 'Visitas encontradas con éxito', visits);
});

// Controlador para obtener una visita por ID
export const getVisitById = tryCatch(async(req, res) => {
    const visit = await Visit.findById(req.params.id).populate({ path: 'checkInBy', select: 'fullName' }).populate({ path: 'checkOutBy', select: 'fullName' });
    if (!visit) {
        return sendResponse(res, 404, 'Visita no encontrada');
    }
    sendResponse(res, 200, 'Visita encontrada con éxito', visit);
});

// Controlador para eliminar una visita por ID
export const deleteVisit = tryCatch(async(req, res) => {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) {
        return res.status(404).json({ error: 'Visita no encontrada' });
    }
    sendResponse(res, 204);
});