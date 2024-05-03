import Service from "../services/service.service.js";

const getListServices = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    Service.getListServices({ limit, offset }, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const searchServices = (req, res) => {
    const keyword = req.query.keyword;
    Service.searchServices({ keyword }, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const getCategory = (req, res) => {
    Service.getCategory("", (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const getServiceByCategory = (req, res) => {
    const category = req.params
    Service.getServiceByCategory(category, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}
const addService = (req, res) => {
    const newService = req.body
    Service.addService(newService, (err, service) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(service);
        }
    })
}

const getDetailService = (req, res) => {
    const { service_id } = req.params;
    Service.getDetailService({}, (err, result) => {
        if (err) {
            res.status(500).send({
                error: err.message
            });
        } else {
            res.status(201).send(result[0]);
        }
    })
}

const updateService = (req, res) => {
    const serviceUpdate = req.body

    Service.updateService(serviceUpdate, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                errData: err.data,
                error: err.message
            });
        } else {
            res.status(202).send("Success");
        }
    })
}

const deleteService = (req, res) => {
    const { id } = req.params;

    Service.deleteService({ id }, (err, result) => {
        if (err) {
            res.status(500).send({
                error: err.message
            });
        } else {
            res.status(204).send("Success");
        }
    })
}

const searchOrderDetailsServices = (req, res) => {
    const keyword = req.query.keyword;
    Service.searchOrderDetailsServices({ keyword }, (err, result) => {
      if (err) {
        res.status(500).send({
          errMessage: err.message
        });
      } else {
        res.status(200).send(result);
      }
    })
  };

export default {
    searchServices,
    getListServices,
    getCategory,
    getServiceByCategory,
    addService,
    getDetailService,
    updateService,
    deleteService,
    searchOrderDetailsServices,
}