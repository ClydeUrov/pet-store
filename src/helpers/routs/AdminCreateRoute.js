import { useParams } from "react-router-dom";
import CreateProduct from "../../components/AdminFolder/ContentFolder/CreateProduct/CreateProduct";

const AdminCreateRoute = () => {
    const { contentName } = useParams();

    switch (contentName) {
        case "products":
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
};

export default AdminCreateRoute;