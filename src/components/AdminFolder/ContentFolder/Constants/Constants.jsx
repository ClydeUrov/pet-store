import { useEffect, useState } from "react";
import axiosService from "../../../../helpers/axios";
import Loader from "../../../Loader/Loader";
import css from "./Constants.module.scss";
import { AiOutlineDownload } from "react-icons/ai";

const Constants = () => {
  const [constants, setConstants] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosService.get(`/constants`)
      .then((resp) => {
        setLoading(false)
        setConstants(resp.data)
      })
    ;
  }, [])

  const updateItem = ({key, data}) => {
    if (key === "LOGO") {
      axiosService.put(`/constants/${key}`, data)
        .then((resp) => {})
    } if (key === "CURRENCY") {
      axiosService.put(`/constants/${key}`, data)
        .then((resp) => {})
    }
  }

  return (
    <section>
      <div className={css.firstLine}>
        <p>Constants</p>
      </div>
        {loading ? (
          <Loader />
        ) : constants && constants.length > 0 ? (
          <div className={css.content}>
            <h3>Logo image</h3>
            <label htmlFor="fileInput" className={css.imageUploadArea}>
              {constants[0].value.filePath ? (
                <img src={constants[0].value.filePath} alt={constants[0].key} />
              ) : (
                <AiOutlineDownload />
              )}
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={(e) => updateItem({key: constants[0].key, data: e.target.files[0] })}
                style={{ display: "none" }}
              />
            <h3>Currency</h3>
            <select
              name="currency"
              value={constants[1].value}
              onChange={(event) => updateItem({ key: constants[1].key, data: event.target.value })}
            >
              <option key={constants[1].key} value={constants[1].value}>
                {constants[1].value}
              </option>
            </select>
          </div>
        ) : (
          <p>No available items</p>
        )}
    </section>
  )
}

export default Constants;