import { useParams } from "react-router-dom";
import Products from "../../components/AdminFolder/ContentFolder/Products/Products.jsx";
import Categories from "../../components/AdminFolder/ContentFolder/Categories/Categories.jsx";
import Brands from "../../components/AdminFolder/ContentFolder/Brands/Brands.jsx";
import Materials from "../../components/AdminFolder/ContentFolder/Materials/Materials.jsx";
import Colors from "../../components/AdminFolder/ContentFolder/Colors/Colors.jsx";
import Weights from "../../components/AdminFolder/ContentFolder/Weights/Weights.jsx";
import Sizes from "../../components/AdminFolder/ContentFolder/Sizes/Sizes.jsx";
import Prescriptions from "../../components/AdminFolder/ContentFolder/Prescriptions/Prescriptions.jsx";
import Constants from "../../components/AdminFolder/ContentFolder/Constants/Constants.jsx";

const AdminContentRoute = () => {
  const { contentName } = useParams();

    switch (contentName) {
      case "products":
        return <Products />;
      case "categories":
        return <Categories />;
      case "brands":
        return <Brands />;
      case "materials":
        return <Materials />;
      case "colors":
        return <Colors />;
      case "weights":
        return <Weights />;
      case "sizes":
        return <Sizes />;
      case "prescriptions":
        return <Prescriptions />;
      case "constants":
        return <Constants />;
      default:
        return;
    }
  // }

  // if (create === "create") {
  //   switch (contentName) {
  //     case "products":
  //       return <CreateProduct />;
  //     // case 'categories':
  //     //     return <CreateCategories />;
  //     // case 'brands':
  //     //     return <CreateBrands />;
  //     // case 'materials':
  //     //     return <CreateMaterials />;
  //     // case 'colors':
  //     //     return <CreateColors />;
  //     // case 'weights':
  //     //     return <CreateWeights />;
  //     // case 'sizes':
  //     //     return <CreateSizes />;
  //     // case 'prescriptions':
  //     //     return <CreatePrescriptions />;
  //     // case 'constants':
  //     //     return <CreateConstants />;
  //     default:
  //       return;
  //   }
  // } else {
  //   switch (contentName) {
  //     case "products":
  //       return <CreateProduct productId={create} />;
  //     default:
  //       return;
  //   }
  // }
};

export default AdminContentRoute;
