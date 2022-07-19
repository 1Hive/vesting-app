import { StyledAccordion } from './index.styles';

interface IAccordion {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const DownArrowIcon = () => {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0.0740516L11.9879 2.34987e-07C11.9355 0.0452157 11.8811 0.0850861 11.8298 0.135286C10.7576 1.17916 9.61817 1.94675 8.45737 2.61359C6.97868 3.46271 5.47782 3.55636 3.97838 2.82828C2.68335 2.20033 1.43114 1.32353 0.244167 0.213609C0.170232 0.144895 0.107981 0.00747508 3.3646e-07 0.0473501C0.0104428 0.0825481 0.0235967 0.115014 0.0390842 0.14383C1.90659 2.67803 3.7741 5.2126 5.64161 7.74787C5.90471 8.10674 6.11725 8.07007 6.37431 7.71689C8.24786 5.16061 10.1232 2.61324 12 0.0740516Z"
        fill="black"
      />
    </svg>
  );
};

export const UpArrowIcon = () => {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.38582e-06 7.92595L0.0120897 8C0.0644686 7.95478 0.118862 7.91491 0.170234 7.86471C1.24239 6.82084 2.38183 6.05325 3.54263 5.38641C5.02132 4.53728 6.52218 4.44364 8.02162 5.17171C9.31665 5.79967 10.5689 6.67647 11.7558 7.78639C11.8298 7.8551 11.892 7.99252 12 7.95265C11.9896 7.91745 11.9764 7.88498 11.9609 7.85617C10.0934 5.32196 8.2259 2.7874 6.35839 0.252132C6.09529 -0.106744 5.88275 -0.0700686 5.62569 0.283111C3.75214 2.83939 1.87678 5.38676 1.38582e-06 7.92595Z"
        fill="black"
      />
    </svg>
  );
};

const Accordion = ({ title, children }: IAccordion) => {
  return (
    <StyledAccordion>
      <div className="p-4 bg-white rounded-lg shadow-xl pointer-events-auto text-[0.8125rem] leading-5 shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-base">{children}</p>
      </div>
    </StyledAccordion>
  );
};

export default Accordion;
