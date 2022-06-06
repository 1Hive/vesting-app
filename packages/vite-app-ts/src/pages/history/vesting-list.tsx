import { useUserVestings } from '~~/hooks';

type HistoryVestingList = {
  address: string;
};

const HistoryVestingList = ({ address }: HistoryVestingList) => {
  console.log(address);

  const { loading, error, data } = useUserVestings(address);
  const isEmpty = data?.vestings === undefined || data?.vestings.length === 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return <div> {isEmpty ? <p>Is Empty</p> : data?.vestings.map((vest, index: number) => <p key={index}>Item</p>)}</div>;
};

export default HistoryVestingList;
