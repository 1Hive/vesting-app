import Accordion from '~~/components/accordion';
import { Wrapper } from './styles';

const FaqView = () => {
  return (
    <Wrapper>
      <h1 className="mb-0 text-3xl tracking-tight">FAQ</h1>

      <div className="mt-6">
        <div className="p-4">
          <Accordion title="What is love?">
            <p>Baby dont hurt me, no more</p>
          </Accordion>
          <Accordion title="What is love?">
            <p>Baby dont hurt me, no more</p>
          </Accordion>
          <Accordion title="What is love?">
            <p>Baby dont hurt me, no more</p>
          </Accordion>
          <Accordion title="What is love?">
            <p>Baby dont hurt me, no more</p>
          </Accordion>
        </div>
      </div>
    </Wrapper>
  );
};

export default FaqView;
