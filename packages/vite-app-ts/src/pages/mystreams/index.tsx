import { useEthersContext } from 'eth-hooks/context';
import MyUserVestings from '~~/components/my-user-streams.tsx';
import { PageTitle } from '~~/components/page-title';
import { Wrapper } from './index.styled';

const MyStreams = () => {
  const ethersContext = useEthersContext();

  return (
    <Wrapper>
      <PageTitle title="My Streams" renderFilters={() => <p className="text-xs">FILTERS</p>} />

      <div className="mt-6">
        <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
          <div className="mt-4">
            {ethersContext.account ? <MyUserVestings account={ethersContext.account} isComplete /> : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MyStreams;
