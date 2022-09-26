import { useAccount } from 'wagmi';
import AllStreamsPack from '~~/components/all-streams-pack.tsx';
import { PageTitle } from '~~/components/page-title';
import { useCurrentChainId } from '~~/hooks/use-chain-id';
import { Wrapper } from './index.styled';

const Transactions = () => {
  const { isConnected, address } = useAccount();

  const { chainId } = useCurrentChainId();

  return (
    <Wrapper>
      <PageTitle title="Streams" renderFilters={() => <p className="text-xs">FILTERS</p>} />

      <div className="mt-6">
        <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
          <div className="">
            {isConnected && address && chainId ? <AllStreamsPack isComplete chainId={chainId} /> : 'Connect you wallet'}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Transactions;
