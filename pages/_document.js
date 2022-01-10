import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,800&display=swap"
            rel="stylesheet"
          ></link>
          <meta
            name="description"
            content="Hệ thống bán lẻ mỹ phẩm chính hãng, chăm sóc sức khoẻ, mẹ và bé, phụ kiện, giá tốt, dịch vụ hàng đầu"
          />
          <meta property="og:title" content="Aichi xinh"></meta>
          <meta content="INDEX,FOLLOW" name="robots"></meta>
          <meta name="author" content="Thanh đẹp trai"></meta>
          <meta name="copyright" content="Thanh đẹp trai"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:locale" content="vi_VN"></meta>
          <meta
            property="og:description"
            content="Hệ thống bán lẻ mỹ phẩm chính hãng, chăm sóc sức khoẻ, mẹ và bé, phụ kiện, giá tốt, dịch vụ hàng đầu"
          ></meta>
          <meta
            name="keywords"
            content="Aichi xinh, mỹ phẩm, thực phẩm chức năng, trắng da, phụ kiện, mẹ và bé, hàng Nhật, kem lẻ, đau xương khớp, viêm xoang, thời trang"
          ></meta>
          <meta
            property="og:image"
            content="https://res.cloudinary.com/can-ecommerce/image/upload/v1641799872/can-ecommerce/S%E1%BB%AFa_r%E1%BB%ADa_m%E1%BA%B7t_Senka_Perfect_Whip_5_na5ztk.jpg"
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
