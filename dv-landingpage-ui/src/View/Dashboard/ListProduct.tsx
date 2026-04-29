
import { Badge, Col, Row, notification } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import { CategoryWithProduct } from "../../dataType/category";
import api from "../../api";
import { ProductResponse } from "../../dataType/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { CartRequest } from "../../dataType/cart";
import { updateCart } from "../../redux/action/cart";

export default function ListProduct() {
  const [listCategory, setListCategory] = useState<CategoryWithProduct[]>([]);
  const cart: CartRequest = useSelector((state: RootState) => state.cart);
  const userInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategoryWithProduct();
  }, []);

  const getAllCategoryWithProduct = async () => {
    try {
      const res = await api.category.getAllCategoryProduct();
      setListCategory(res.data);
    } catch (err) {
      notification.error({
        message: "Thông báo",
        description: "Không thể lấy danh sách danh mục",
      });
    }
  };

  const addProductToCart = (productAdd: ProductResponse) => {
    const existed = cart.productIds.find(
      (item) => item.product.id === productAdd.id
    );

    if (existed) {
      notification.warning({
        message: "Thông báo",
        description: "Sản phẩm đã có trong giỏ hàng!",
      });
      return;
    }

    const cartNew: CartRequest = {
      userId: userInfo.id,
      totalAmount: cart.totalAmount + productAdd.price,
      orderNumber: 0,
      productIds: [
        ...cart.productIds,
        { product: productAdd, quantity: 1 },
      ],
    };

    dispatch(updateCart(cartNew));
  };

  // ✅ FILTER CATEGORY ĐÚNG
  const validCategories = listCategory
    .map((category) => {
      const validProducts = category.products
        .filter((p) => p.active_flg !== 0)
        .slice(0, 6);

      return {
        ...category,
        validProducts,
      };
    })
    .filter((category) => category.validProducts.length > 0)
    .slice(0, 5);

  return (
    <div className="product-container">
      {validCategories.map((category) => (
        <div key={category.id}>
          {/* HEADER */}
          <div className="header">
            <p className="name-category">{category.name}</p>
            <Link to={`/category/${category.id}`}>
              <p className="fst-italic">Xem tất cả</p>
            </Link>
          </div>

          {/* PRODUCT LIST */}
          <Row gutter={[16, 16]}>
            {category.validProducts.map((product) => (
              <Col
                key={product.id}
                xs={12}
                md={8}
                lg={6}
                xl={4}
              >
                {product.status ? (
                  <ProductCard
                    productInfo={product}
                    addProductToCart={addProductToCart}
                  />
                ) : (
                  <Badge.Ribbon text="Ngừng kinh doanh" color="red">
                    <ProductCard
                      productInfo={product}
                      addProductToCart={addProductToCart}
                    />
                  </Badge.Ribbon>
                )}
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}
