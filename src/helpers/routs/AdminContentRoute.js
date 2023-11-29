import { useParams } from "react-router-dom";
import Products from "../../components/AdminFolder/ContentFolder/Products/Products.jsx";
import Constants from "../../components/AdminFolder/ContentFolder/Constants/Constants.jsx";
import Characteristics from "../../components/AdminFolder/ContentFolder/Characteristics/Characteristics.jsx";

const AdminContentRoute = () => {
  const { contentName } = useParams();

    switch (contentName) {
      case "products":
        return <Products />;
      case "categories":
        return <Characteristics action='product-categories' title='Categories' />;
      case "brands":
        return <Characteristics action='brands' title='Brands' />;
      case "ages":
        return <Characteristics action='ages' title='Ages' />;
      case "materials":
        return <Characteristics action='materials' title='Materials' />;
      case "colors":
        return <Characteristics action='colors' title='Colors' />;
      case "weights":
        return <Characteristics action='weights' title='Weights' />;
      case "sizes":
        return <Characteristics action='product-sizes' title='Sizes' />;
      case "prescriptions":
        return <Characteristics action='prescriptions' title='Prescriptions' />;
      case "constants":
        return <Constants />;
      default:
        return;
    }
};

export default AdminContentRoute;
