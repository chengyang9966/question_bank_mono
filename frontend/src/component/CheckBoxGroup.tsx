import { Checkbox, Col, FormInstance, Row, Typography } from 'antd';
import React, { useState } from 'react';

const CheckBoxGroup = ({
  mcqOptions,
  form,
  field,
}: {
  mcqOptions: { label: string; value: string; sideText?: string }[];
  form: FormInstance<any>;
  field: string;
}) => {
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (selectedValues: string[]) => {
    const allValuesExcludeAll = mcqOptions
      .map((option) => option.value)
      .filter((value) => value !== 'All');

    if (selectedValues.includes('All')) {
      //   let withoutAll = selectedValues.filter((value) => value !== 'All');
      if (
        selectedOptions.includes('All') &&
        allValuesExcludeAll.length !== selectedValues.filter((x) => x !== 'All').length
      ) {
        selectedValues = selectedValues.filter((value) => value !== 'All');
      } else {
        selectedValues = ['All', ...allValuesExcludeAll];
      }
      // If "All" is selected, select all checkboxes

      setIsIndeterminate(false);
    } else {
      if (selectedOptions.includes('All')) {
        selectedValues = [];
      }
      //   Selected All Without select All
      if (selectedValues.length === allValuesExcludeAll.length) {
        selectedValues = ['All', ...allValuesExcludeAll];
      }
    }
    setSelectedOptions(selectedValues);
    form.setFieldsValue({
      [field]: selectedValues,
    });
    // Set "indeterminate" if some but not all options are selected
    const isPartialSelection =
      selectedValues.length > 0 && selectedValues.length < allValuesExcludeAll.length;
    setIsIndeterminate(isPartialSelection);
  };

  return (
    <Checkbox.Group
      value={selectedOptions}
      onChange={handleChange}
      style={{ display: 'block', width: '100%' }}
    >
      {mcqOptions.map((option, index) => (
        <Row justify={'space-between'} align={'middle'}>
          <Col>
            <Checkbox
              key={option.value}
              value={option.value}
              indeterminate={option.value === 'All' ? isIndeterminate : undefined}
            >
              <Typography.Text strong>{option.label}</Typography.Text>
            </Checkbox>
          </Col>
          <Col>
            <p>{option?.sideText}</p>
          </Col>
        </Row>
      ))}
    </Checkbox.Group>
  );
};

export default CheckBoxGroup;
