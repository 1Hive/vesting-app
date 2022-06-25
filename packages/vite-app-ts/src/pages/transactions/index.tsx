import { useEthersContext } from 'eth-hooks/context';
import MyUserVestings from '~~/components/my-user-streams.tsx';
import { Wrapper } from './index.styled';

const Transactions = () => {
  const ethersContext = useEthersContext();

  return (
    <Wrapper>
      <h1 className="mb-0 text-3xl tracking-tight">Streams</h1>

      <div className="mt-6">
        <div className="p-4">
          <div className="mt-4">{ethersContext.account ? <MyUserVestings isComplete /> : null}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Transactions;
