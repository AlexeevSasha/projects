import { useEffect, useState } from 'react';
import type { PaginationProps } from 'antd/es/pagination';
import { useRouter } from 'next/router';

export type HookUsePaginationProps = {
  showTotal?: boolean;
  showSizeChanger?: boolean;
};

export const usePagination = (props: HookUsePaginationProps) => {
  const { showTotal, showSizeChanger } = props;

  const router = useRouter();

  const onChangePagination = (page: number, pageSize: number) => {
    setPaginationProps({ ...paginationProps, current: page, pageSize });
    setPagination({ page, pageSize });
    router.push(
      {
        pathname: router.pathname,
        query: {
          page,
          pageSize,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const showTotalFunc = (total: number) => `Кол-во записей: ${total}`;

  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger,
    onChange: onChangePagination,
    showTotal: showTotal ? showTotalFunc : undefined,
  });

  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: paginationProps.current || 1,
    pageSize: paginationProps.pageSize || 20,
  });

  useEffect(() => {
    const queryPage = Number(router.query.page);
    const queryPageSize = Number(router.query.pageSize);

    if (queryPage && queryPageSize) {
      setPaginationProps((prevState) => ({
        ...prevState,
        current: queryPage,
        pageSize: queryPageSize,
      }));
    }
  }, [router.query?.page, router.query?.pageSize]);

  return {
    pagination,
    setPagination,
    onChangePagination,
    paginationProps,
    setPaginationProps,
  };
};
