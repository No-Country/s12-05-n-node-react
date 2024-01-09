import CourierService from "../models/courierService.js";
import Visit from "../models/visit.js";
import New from "../models/new.js";
import { tryCatch } from '../utils/tryCatch.js';
import { sendResponse } from '../utils/responses.js';

export const getTotalsDashboard = tryCatch(async(req, res) => {
    const totalVisits = await Visit.countDocuments();
    const totalNews = await New.countDocuments();
    const totalCourierServices = await CourierService.countDocuments();
    const visitsByMonth = await Visit.aggregate(
        [{
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 },
                    date: { $first: "$createdAt" }
                }
            },
            {
                $project: {
                    date: {
                        $dateToString: { format: "%Y-%m", date: "$date" }
                    },
                    count: 1,
                    _id: 0
                }
            },

            {
                $sort: {
                    'date': -1,
                }
            }
        ])
    const NewsByMonth = await New.aggregate(
            [{
                    $group: {
                        _id: {
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" }
                        },
                        count: { $sum: 1 },
                        date: { $first: "$createdAt" }
                    }
                },
                {
                    $project: {
                        date: {
                            $dateToString: { format: "%Y-%m", date: "$date" }
                        },
                        count: 1,
                        _id: 0
                    }
                },

                {
                    $sort: {
                        'date': -1,
                    }
                }
            ])
        /*const visitsByMonth = await Visit.aggregate([{
            $group: {
                _id: { $substr: ['$createdAt', 5, 2] },
                numberofvisits: { $sum: 1 }
            }
        }])*/
    const courierServiceByMonth = await CourierService.aggregate(
        [{
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 },
                    date: { $first: "$createdAt" }
                }
            },
            {
                $project: {
                    date: {
                        $dateToString: { format: "%Y-%m", date: "$date" }
                    },
                    count: 1,
                    _id: 0
                }
            },

            {
                $sort: {
                    'date': -1,
                }
            }
        ])
    const courierServiceReceivedByMonth = await CourierService.aggregate(
        [{
                $match: {
                    status: 'received'
                }
            }, {

                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 },
                    date: { $first: "$createdAt" }
                }
            },
            {
                $project: {
                    date: {
                        $dateToString: { format: "%Y-%m", date: "$date" }
                    },
                    count: 1,
                    _id: 0
                }
            },

            {
                $sort: {
                    'date': -1,
                }
            }
        ])
    var result = {};
    result.totalVisits = totalVisits;
    result.totalNews = totalNews;
    result.totalCourierServices = totalCourierServices;
    result.totalCourierServicesInProgress = courierServiceReceivedByMonth[0].count;
    result.totalsVisitsByMonth = visitsByMonth;
    result.totalsNewsByMonth = NewsByMonth;
    result.totalCourierServicesByMonth = courierServiceByMonth;

    sendResponse(res, 200, 'Estadísticas Carpincho Security', result);
})