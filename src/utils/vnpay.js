const vnpay = require('vnpay-sdk');

const config = {
  vnp_TmnCode: 'JED9XWAA',
  vnp_HashSecret: 'LPDSXZSLZHQTJAKRLCCODHVPORSWIAPT',
  vnp_Url:"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
};

const getPaymentStatus = async (req, res) => {
  const vnp_SecureHash = req.query['vnp_SecureHash'];
  const vnp_TxnRef = req.query['vnp_TxnRef'];

  const data = {
    vnp_SecureHash,
    vnp_TxnRef,
  };

  const verify = await vnpay.verify(data, config.vnp_HashSecret);

  if (verify) {
    const { vnp_ResponseCode, vnp_Amount, vnp_OrderInfo } = req.query;

    if (vnp_ResponseCode === '00') {
      const order = {
        txn_ref: vnp_TxnRef,
        amount: vnp_Amount,
        order_info: vnp_OrderInfo,
        status: 'success',
      };

      res.status(200).json({
        success: true,
        message: 'Thanh toán thành công',
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Thanh toán thất bại. Mã lỗi: ${vnp_ResponseCode}`,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Lỗi xác thực dữ liệu thanh toán',
    });
  }
};

module.exports = {
  getPaymentStatus,
};
