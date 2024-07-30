import React, { useCallback, useEffect, useState } from "react";
import { Button, message, Modal, Table } from "antd";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import type { IProduct, IFilters } from "../../../api/dto/pointsSystem";
import { FiltersButtonBlock } from "../../../ui/commonComponents";
import { Loader } from "../../../ui/Loader";
import { generateColumnsProduct } from "../../../ui/tableColumnsGenerator/pointsSystem/generateColumnsProduct";
import { onChangeDataTable, onChangePaginationTable } from "../../../common/helpers/tablesPropsHelpers";
import ProductForm from "./modal/ProductForm";
import ProductDescription from "./modal/ProductDescription";
import { FiltersHeaderBase } from "../../../ui/customFilters/FiltersHeaderBase";
import { changeVisibilityProduct, createProduct, deleteProduct, getProducts, updateProduct } from "../../../api/requests/pointsSystem";
import { validationCheckCountToPages } from "../../../common/helpers/commonValidators/validationCheckCountToPages";

const Product = ({ access }: { access: boolean }) => {
  const { t } = useTranslation();

  const initialFilterParams = {
    name: "",
    pagination: 1,
    sorting: ""
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IProduct[]>([]);
  const [count, setCount] = useState(0);

  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDesc, setVisibleDesc] = useState<boolean>(false);
  const [selected, setSelected] = useState<IProduct | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<IFilters>(initialFilterParams);

  useEffect(() => {
    setIsLoading(true);
    getProducts(filterValues)
      .then((result) => {
        setData(result.data);
        setCount(result.count);
      })
      .then(() => setIsLoading(false));
  }, [filterValues, reload]);

  const changeFilters = useCallback(
    debounce((nameField: string, value: unknown) => {
      setFilterValues((prev) => ({ ...prev, pagination: 1, [nameField]: value }));
    }, 300),
    [setFilterValues]
  );

  const resetFilters = useCallback(() => {
    setFilterValues((prev) => ({ ...initialFilterParams, sorting: prev.sorting }));
  }, [setFilterValues]);

  useEffect(() => {
    validationCheckCountToPages(count, filterValues.pagination, setFilterValues);
  }, [count]);

  const deleteModal = (id: string) => {
    Modal.confirm({
      title: t("common.modal.title") + " " + t("common.modal.delete") + "?",
      maskClosable: true,
      content: t("pointsSystem.products.modal.content.delete"),
      okText: t("common.buttonsText.confirm"),
      cancelText: t("common.buttonsText.cancel"),
      onOk: async () =>
        deleteProduct(id).then(() => {
          message.success(t("success.delete.product"));
          setReload(!reload);
        })
    });
  };

  const visibleModal = (product: IProduct) => {
    changeVisibilityProduct(product).then(() => {
      message.success(t("pointsSystem.products.statusChanged"));
      setReload(!reload);
    });
  };

  const showForm = (value = null) => {
    setVisible(!visible);
    setTimeout(() => setSelected(value), value ? 0 : 100);
  };

  const showDescription = (value = null) => {
    setVisibleDesc(!visibleDesc);
    setSelected(value);
  };

  const handleClose = () => {
    setSelected(null);
    setVisible(false);
    setVisibleDesc(false);
  };

  const handleSave = (payload: IProduct, update: boolean = false) => {
    setIsLoading(true);
    if (update) {
      updateProduct(payload).then(() => {
        setVisible(false);
        message.success(t("success.update.product"));
        setReload(!reload);
      });
    } else {
      createProduct(payload).then(() => {
        setVisible(false);
        message.success(t("success.create.product"));
        setReload(!reload);
      });
    }
  };

  const columns = generateColumnsProduct(access, {
    showForm,
    showDescription,
    deleteModal,
    visibleModal,
    translation: t
  });

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <FiltersButtonBlock>
        <FiltersHeaderBase
          placeholder={t("adv.filters.placeholders.title")}
          isDisabledResetFilters={isLoading}
          name={"name"}
          onChange={changeFilters}
          resetFilters={resetFilters}
        />
        {access && (
          <Button onClick={() => showForm()} type="primary" icon={<PlusOutlined />}>
            {t("common.buttonsText.create")}
          </Button>
        )}
      </FiltersButtonBlock>
      <Table
        rowKey={(entity) => entity.id}
        onChange={(pagination, filters, sorter) => onChangeDataTable(pagination, sorter, filterValues, setFilterValues)}
        pagination={onChangePaginationTable(count, filterValues.pagination)}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1120 }}
        sticky
      />
      <ProductForm data={selected} visible={visible} onClose={handleClose} onSave={handleSave} />
      <ProductDescription data={selected} visible={visibleDesc} onClose={() => showDescription()} />
    </>
  );
};

export default Product;
