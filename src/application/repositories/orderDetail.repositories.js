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
    connection.query(`SELECT od.*,o.*,s.*,u.* FROM order_details AS od JOIN orders AS o ON od.order_id = o.order_id JOIN services AS s ON od.service_id = s.service_id JOIN users AS u ON o.user_id = u.user_id`, [params], (error, results) => {
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