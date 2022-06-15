import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ContentType } from "types/ContentType";
import { requestBackend } from "util/requests";
import { OfferAux } from "types/OfferAux";
import navigate from "util/navigate";
import Select from "react-select";
import "./styles.css";

type UrlParams = {
  contentId: string;
};

const Form = () => {
  const { contentId } = useParams<UrlParams>();

  const isEditing = contentId !== "create";

  const [selectOffers, setSelectOffers] = useState<OfferAux[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ContentType>();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const params: AxiosRequestConfig = {
        url: "/offers",
        method: "GET",
        withCredentials: true,
        signal: controller.signal,
      };

      const data = (await requestBackend(params)).data.content;
      setSelectOffers(data);
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (isEditing) {
      (async () => {
        const params: AxiosRequestConfig = {
          url: `/contents/${contentId}`,
          withCredentials: true,
          signal: controller.signal,
          method: "GET",
        };

        const data = (await requestBackend(params)).data as ContentType;
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("videoUri", data.videoUri);
        setValue("offer", data.offer);
      })();

      return () => controller.abort();
    }
  }, [isEditing, contentId, setValue]);

  const onSubmit = (content: ContentType) => {
    const params: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/contents/${contentId}` : "/contents",
      data: {
        ...content,
      },
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        toast.success("Sucesso");
        navigate.replace("/admin/adminContent");
      })
      .catch((err) => {
        toast.error("Erro: " + err);
        console.log(err);
      });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate.replace("/admin/adminContent");
  };

  return (
    <div className="content-form-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="base-card content-form-card"
      >
        <h1>Dados do Conteúdo:</h1>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Título"
            {...register("title", {
              required: "Campo obrigatório",
            })}
            className={`form-control base-input ${
              errors.title ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">
            {errors.title?.message}
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Descrição"
            {...register("description", {
              required: "Campo obrigatório",
            })}
            className={`form-control base-input ${
              errors.description ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">
            {errors.description?.message}
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="URL do vídeo"
            {...register("videoUri", {
              required: "Campo obrigatório",
            })}
            className={`form-control base-input ${
              errors.videoUri ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">
            {errors.videoUri?.message}
          </div>
        </div>
        <div className="mb-3">
          <Controller
            name="offer"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectOffers}
                classNamePrefix="content-crud-select"
                getOptionLabel={(offer: OfferAux) =>
                  offer.name + " " + offer.edition
                }
                getOptionValue={(offer: OfferAux) => String(offer.id)}
              />
            )}
          />
          {errors.offer && (
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
