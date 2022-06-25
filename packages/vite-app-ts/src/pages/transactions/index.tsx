import { useEthersContext } from 'eth-hooks/context';
import MyUserVestings from '~~/components/my-user-streams.tsx';
import { Wrapper } from './index.styled';

const Transactions = () => {
  const ethersContext = useEthersContext();

  return (
    <Wrapper>
      <div className="flex items-center justify-between">
        <h1 className="mb-0 text-3xl tracking-tight">Streams</h1>
        <p className="text-xs">FILTERS</p>
      </div>

      <div className="mt-6">
        <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
          <div className="mt-4">{ethersContext.account ? <MyUserVestings isComplete /> : null}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Transactions;
