import {
  InnerSection,
  FlexBox,
  FlexRow,
  FlexColumn,
  Typography,
} from "../../../App.Styles";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../../Redux/Orders/ordersActions";
import { useHistory } from "react-router";
import Button from "../../../Components/Button/Button";
import { ErrorMessage, Input } from "../LoginPage/LoginPage.Styles";
import OrderCard from "../../../Components/OrderCard/OrderCard";

import {
  Order,
  OrderDetails,
  OrderDetail,
  Shipping,
  ShippingAddress,
} from "./Review Order.Style";
export default function PlaceOrder(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <FlexBox color="#fff" style={{ alignItems: "start" }}>
      <Shipping>
        <ShippingAddress>
          <FlexRow style={{ justifyContent: "space-between" }}>
            <Typography
              style={{ justifyContent: "start" }}
              fontSize="24"
              fontWeight="bold"
              color="#242424"
            >
              Shipping Address
            </Typography>
          </FlexRow>
          <Typography
            style={{ justifyContent: "start" }}
            fontSize={"22"}
            color={"#242424"}
          >
            {state.userDetails.user.name}
          </Typography>
          <Typography
            fontSize={"16"}
            color={"#242424"}
            fontWeigh={"light"}
            style={{
              maxWidth: "290px",
              lineHeight: "2",
              justifyContent: "start",
            }}
          >
            {state.cart.shippingAddress.country}-
            {state.cart.shippingAddress.city}
          </Typography>
        </ShippingAddress>
        <OrderDetail>
          <FlexRow
            style={{ justifyContent: "space-between", marginBottom: "16px" }}
          >
            <Typography
              style={{ justifyContent: "start" }}
              fontSize="24"
              fontWeight="bold"
              color="#242424"
            >
              Order Details
            </Typography>
          </FlexRow>
          {state.cart.cart.map((i) => (
            <OrderCard
              key={i._id}
              src={"https://proshop-ms.herokuapp.com/" + i.image}
              orderName={i.name}
              orderNumber={i.quantity}
              subTotal={i.price * i.quantity}
              price={i.price}
            />
          ))}
        </OrderDetail>
      </Shipping>
      <Order>
        <OrderDetails>
          <Typography
            fontSize={"32"}
            color={"#242424"}
            fontWeight={"bold"}
            style={{ marginBottom: "30px", justifyContent: "start" }}
          >
            Order Details
          </Typography>
          <FlexRow style={{ justifyContent: "space-between" }}>
            <Typography style={{ justifyContent: "start" }} color={"#707070"}>
              Subtotal
            </Typography>
            <Typography style={{ justifyContent: "start" }} color={"#707070"}>
              $
              {state.cart.cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
          </FlexRow>
          <FlexRow style={{ justifyContent: "space-between" }}>
            <Typography style={{ justifyContent: "start" }} color={"#707070"}>
              Tax
            </Typography>
            <Typography style={{ justifyContent: "start" }} color={"#707070"}>
              $0
            </Typography>
          </FlexRow>
          <FlexRow style={{ justifyContent: "space-between" }}>
            <Typography
              style={{ justifyContent: "start" }}
              color={"#242424"}
              fontWeight={"bold"}
            >
              Shipping
            </Typography>
            <Typography
              style={{ justifyContent: "start" }}
              color={"#242424"}
              fontWeight={"bold"}
            >
              $
              {state.cart.cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
          </FlexRow>
        </OrderDetails>

        {state.orders.placeOrder.error && (
          <ErrorMessage>{state.orders.placeOrder.error}</ErrorMessage>
        )}
        <Button
          isLoading={state.orders.placeOrder.isLoading}
          onClick={() => dispatch(placeOrder(history))}
          text={"Place Order"}
          width={"324px"}
          style={{ height: "62px", alignSelf: "flex-end", marginTop: "30px" }}
        />
      </Order>
    </FlexBox>
  );
}
