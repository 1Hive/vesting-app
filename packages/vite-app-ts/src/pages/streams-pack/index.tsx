import { useEthersContext } from 'eth-hooks/context';
import AllStreamsPack from '~~/components/all-streams-pack.tsx';
import { PageTitle } from '~~/components/page-title';
import { Wrapper } from './index.styled';

const StreamsPack = () => {
  const ethersContext = useEthersContext();

  return (
    <Wrapper>
      <PageTitle title="Streams Pack" />

      <div className="mt-6">
        <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
          <div className="">{ethersContext.account ? <AllStreamsPack isComplete /> : 'Connect you wallet'}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default StreamsPack;
