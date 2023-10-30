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
    const { contentId, createId } = useParams();
    console.log(contentId, createId);

    if (createId === 'create') {
        switch (contentId) {
            case 'products':
                return <CreateProduct />;
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
    } else {
        switch (contentId) {
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