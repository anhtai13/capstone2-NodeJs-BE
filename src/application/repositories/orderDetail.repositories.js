import getConnection from "../../config/connection.database.js";

const connection = getConnection();

const getListOrderDetail = (params, callback) => {
    connection.query(`SELECT od.*,o.*,s.*,u.* FROM order_details AS od JOIN orders AS o ON od.order_id = o.order_id JOIN services AS s ON od.service_id = s.service_id JOIN users AS u ON o.user_id = u.user_id`, [params], (error, results) => {
        if (error) {
            callback({ message: "Something wrong!" }, null);
        }
        else {
            callback(null, results);
        }
    });
}

const getOrderDetailById = (params, callback) => {
    console.log(params)
    connection.query(
        `SELECT 
        od.order_detail_id,
        od.order_id,
        od.phone_number,
        od.service_id,
        od.note,
        FORMAT(od.unit_price, 'C', 'en-US') AS unit_price_formatted,
        FORMAT(od.sub_total_price, 'C', 'en-US') AS sub_total_price_formatted,
        od.address_order,
        od.area,
        od.start_time,
        od.full_name,
        od.service_name,
        od.estimated_time,
        od.employee_code,
        od.vnp_ResponseCode,
        od.payment,
        od.housetype,
        od.work_date,
        od.notification,
        od.status_payment,
        o.*, 
        s.*, 
        u.*
    FROM 
        order_details AS od 
        JOIN orders AS o ON od.order_id = o.order_id 
        JOIN services AS s ON od.service_id = s.service_id 
        JOIN users AS u ON o.user_id = u.user_id
    WHERE 
        o.order_id = ?`,
        [params], (error, results) => {
            if (error) {
                callback({ message: "Something wrong!" }, null);
            }
            else {
                callback(null, results);
            }
        });
}

export default {
    getListOrderDetail,
    getOrderDetailById
}