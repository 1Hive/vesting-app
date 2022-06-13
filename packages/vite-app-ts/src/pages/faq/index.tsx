const FaqView = () => {
  return (
    <div>
      <div className="px-6 py-4 mx-8 my-3 text-sm border-2 rounded-lg cursor-pointer select-none question-and-answer group">
        <dt className="question">
          <div className="flex justify-between">
            <div className="font-semibold text-indigo-800">Do you accept Paypal?</div>
            <div>3333</div>
          </div>
        </dt>
        <dd className="hidden mt-2 leading-snug text-gray-700 answer">
          Yes, we do, along with AliPay, PayTM, and Payoneer.
        </dd>
      </div>
    </div>
  );
};

export default FaqView;
