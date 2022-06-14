import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { OfferType } from "types/OfferType";
import navigate from "util/navigate";
import { requestBackend } from "util/requests";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

type UrlParams = {
  offerId: string;
};

const Form = () => {
  const { offerId } = useParams<UrlParams>();

  const isEditing = offerId !== "create";

  const [startMoment, setStartMoment] = useState(new Date());
  const [endMoment, setEndMoment] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<OfferType>();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const data = (
        await requestBackend({
          url: `/offers/${offerId}`,
          withCredentials: true,
          method: "GET",
        })
      ).data as OfferType;
      setStartMoment(new Date(data.startMoment));
      setEndMoment(new Date(data.endMoment));
    })();

    return () => controller.abort();
  }, [offerId]);

  useEffect(() => {
    if (isEditing) {
      const controller = new AbortController();
      (async () => {
        const params: AxiosRequestConfig = {
          url: `/offers/${offerId}`,
          withCredentials: true,
          method: "GET",
          signal: controller.signal,
        };

        const data = (await requestBackend(params)).data as OfferType;
        setValue("name", data.name);
        setValue("imgUri", data.imgUri);
        setValue("edition", data.edition);
        setValue("description", data.description);
        setValue("startMoment", startMoment.toString());
        setValue("endMoment", endMoment.toString());
      })();

      return () => controller.abort();
    }
  }, [isEditing, offerId, setValue, startMoment, endMoment]);

  const onSubmit = (offer: OfferType) => {
    const params: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/offers/${offerId}` : "/offers",
      data: {
        ...offer,
        startMoment: startMoment,
        endMoment: endMoment,
      },
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        toast.success("Sucesso");
        navigate.replace("/admin/adminOffer");
      })
      .catch((err) => {
        toast.error("Erro: " + err);
        console.log(err);
      });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate.replace("/admin/adminOffer");
  };

  return (
    <div className="offer-form-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="base-card offer-form-card"
      >
        <h1>Dados da Oferta:</h1>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Nome da oferta"
            {...register("name", {
              required: "Campo obrigatório",
            })}
            className={`form-control base-input ${
              errors.name ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">{errors.name?.message}</div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="URL da imagem da oferta"
            {...register("imgUri", {
              required: "Campo obrigatório",
              pattern: {
                value: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/,
                message: "URL inválida",
              },
            })}
            className={`form-control base-input ${
              errors.name ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">
            {errors.imgUri?.message}
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Edição da oferta"
            {...register("edition", {
              required: "Campo obrigatório",
            })}
            className={`form-control base-input ${
              errors.name ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">
            {errors.edition?.message}
          </div>
        </div>
        <div className="mb-3">
          <textarea
            rows={7}
            placeholder="Descrição da oferta"
            {...register("description", {
              required: "Campo obrigatório",
            })}
            className={`form-control base-input h-auto ${
              errors.name ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">
            {errors.description?.message}
          </div>
        </div>
        <div className="mb-3">
          <Controller
            name="startMoment"
            control={control}
            render={({ field }) => (
              <ReactDatePicker
                placeholderText="Data de Início"
                onChange={(date) =>
                  date && field.onChange(setStartMoment(date))
                }
                selected={startMoment}
                dateFormat="yyyy/MM/dd h:mm:ss"
                className="date-picker base-input"
                showTimeInput
              />
            )}
          />
          {errors.startMoment && (
            <div className="invalid-feedback d-block">Campo obrigatório</div>
          )}
        </div>
        <div className="mb-3">
          <Controller
            name="endMoment"
            control={control}
            render={({ field }) => (
              <ReactDatePicker
                placeholderText="Data final"
                onChange={(date) => date && field.onChange(setEndMoment(date))}
                selected={endMoment}
                dateFormat="yyyy/MM/dd h:mm:ss"
                className="date-picker base-input"
                showTimeInput
              />
            )}
          />
          {errors.endMoment && (
            <div className="invalid-feedback d-block">Campo obrigatório</div>
          )}
        </div>
        <div className="form-crud-buttons">
          <button className="btn btn-danger me-2" onClick={handleCancel}>
            CANCELAR
          </button>
          <button className="btn btn-outline-info">SALVAR</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
