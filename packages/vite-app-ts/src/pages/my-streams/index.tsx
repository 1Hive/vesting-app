import { useAccount } from 'wagmi';
import MyUserStreams from '~~/components/my-user-streams.tsx';
import { PageTitle } from '~~/components/page-title';
import { useCurrentChainId } from '~~/hooks/use-chain-id';
import { Wrapper } from './index.styled';

const MyStreams = () => {
  const { isConnected, address } = useAccount();

  const { chainId } = useCurrentChainId();

  return (
    <Wrapper>
      <PageTitle title="My Streams" renderFilters={() => <p className="text-xs">FILTERS</p>} />

      <div className="mt-6">
        <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
          <div className="">
            {isConnected && address && chainId ? (
              <MyUserStreams chainId={chainId} account={address} isComplete />
            ) : (
              'Connect you wallet'
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MyStreams;
