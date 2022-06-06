import { useEthersContext } from 'eth-hooks/context';
import { Wrapper } from './index.styled';
import HistoryVestingList from './vesting-list';

const History = () => {
  const ethersContext = useEthersContext();

  if (!ethersContext.account) {
    return <p>No address provided</p>;
  }

  return (
    <Wrapper>
      <div className="flex items-center justify-between text-sm space-x-6">
        <h1 className="mb-0 text-4xl font-extrabold tracking-tight text-center text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          History
        </h1>
        <a
          href="/"
          className="flex items-center justify-center w-full h-12 px-6 font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
          Home
        </a>
      </div>

      {!ethersContext.account ? <HistoryVestingList address={ethersContext.account} /> : null}
    </Wrapper>
  );
};

export default History;
