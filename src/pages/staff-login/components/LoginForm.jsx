import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useTranslation } from '../../../utils/translations';

const LoginForm = ({ onLogin, isLoading, error }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    employeeId: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (formData?.employeeId && formData?.password) {
      onLogin(formData?.employeeId, formData?.password);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('login.employeeId')} <span className="text-error">*</span>
        </label>
        <Input
          type="text"
          value={formData?.employeeId}
          onChange={(e) => handleInputChange('employeeId', e?.target?.value)}
          placeholder={t('form.enterValue')}
          disabled={isLoading}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {t('login.password')} <span className="text-error">*</span>
        </label>
        <Input
          type="password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          placeholder="••••••••"
          disabled={isLoading}
          className="w-full"
        />
      </div>
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
      <Button
        type="submit"
        fullWidth
        iconName="LogIn"
        iconPosition="left"
        disabled={!formData?.employeeId || !formData?.password || isLoading}
      >
        {t('login.login')}
      </Button>
    </form>
  );
};

export default LoginForm;