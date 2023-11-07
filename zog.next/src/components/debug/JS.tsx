const JS = ({ data }: { data: any }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
export default JS;
