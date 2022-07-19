import React from 'react';

type PageTitleProps = {
  title: string;
  renderFilters?: () => React.ReactElement;
};

export const PageTitle = ({ title, renderFilters }: PageTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="mb-0 text-3xl tracking-tight">{title}</h1>
      {renderFilters && renderFilters()}
    </div>
  );
};
