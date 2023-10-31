import { useParams } from "react-router-dom";
import Products from './Products/Products'
import Categories from './Categories/Categories'
import Brands from './Brands/Brands.jsx'
import Materials from './Materials/Materials.jsx'
import Colors from './Colors/Colors.jsx'
import Weights from './Weights/Weights.jsx'
import Sizes from './Sizes/Sizes.jsx'
import Prescriptions from './Prescriptions/Prescriptions.jsx'
import Constants from './Constants/Constants.jsx'
import CreateProduct from "./CreateProduct/CreateProduct";

const ContentRouter = () => {
    const { contentName, create } = useParams();
    console.log(contentName, create);

    if (create === 'create') {
        switch (contentName) {
            case 'products':
                return <CreateProduct />;
            // case 'categories':
            //     return <CreateCategories />;
            // case 'brands':
            //     return <CreateBrands />;
            // case 'materials':
            //     return <CreateMaterials />;
            // case 'colors':
            //     return <CreateColors />;
            // case 'weights':
            //     return <CreateWeights />;
            // case 'sizes':
            //     return <CreateSizes />;
            // case 'prescriptions':
            //     return <CreatePrescriptions />;
            // case 'constants':
            //     return <CreateConstants />;
            default:
                return;
        }
    } else {
        switch (contentName) {
            case 'products':
                return <Products />;
            case 'categories':
                return <Categories />;
            case 'brands':
                return <Brands />;
            case 'materials':
                return <Materials />;
            case 'colors':
                return <Colors />;
            case 'weights':
                return <Weights />;
            case 'sizes':
                return <Sizes />;
            case 'prescriptions':
                return <Prescriptions />;
            case 'constants':
                return <Constants />;
            default:
                return;
        }
    }
};

export default ContentRouter;