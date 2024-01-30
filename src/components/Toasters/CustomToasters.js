import { toast } from "react-toastify";
import { TiWarning } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

function CloseButtonIcon({ closeToast }) {
  return (
    <i onClick={closeToast} style={{ paddingRight: "0.5rem" }}>
      <IoClose size={18} color="#5f5f5f" />
    </i>
  );
}

function WarningToast(text) {
  toast.warning(text, {
    style: {
      backgroundColor: "##ffffff",
      color: "#ffad4d",
    },
    progressStyle: {
      backgroundColor: "#d18f43",
    },
    icon: () => <TiWarning size={34} color="#ffad4d" />,
    theme: "light",
  });
}

function InfoToast(text) {
  toast.info(text, {
    theme: "light",
    style: {
      backgroundColor: "#f4f6fa",
      color: "#1b1b1b",
    },
  });
}

function ErrorToast(text) {
  toast.error(text, {
    theme: "light",
    style: {
      border: "2px solid #f78989",
      borderBottom: "1px solid #f78989",
      color: "#f23b3b",
    },
    progressStyle: {
      backgroundColor: "#f78989",
    },
  });
}

export { WarningToast, CloseButtonIcon, InfoToast, ErrorToast };
