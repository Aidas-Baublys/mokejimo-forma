import { Select } from 'antd';
import { useLanguage } from './translationState';

const { Option } = Select;

const LangSelect = () => {
  const { translate, setLanguage } = useLanguage();

  return (
    <Select defaultValue='en' onChange={setLanguage}>
      <Option value='en'>{translate('en')}</Option>
      <Option value='lt'>{translate('lt')}</Option>
    </Select>
  );
};

export default LangSelect;
