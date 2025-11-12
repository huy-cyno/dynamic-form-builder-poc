// Form service for React application
class FormService {
  constructor() {
    this.formsCache = new Map();
    this.currentLocale = 'default';
    this.localeListeners = [];

    this.formsList = [
      {
        id: 'customer-questionnaire',
        name: 'customer-questionnaire',
        title: {
          default: 'Customer Questionnaire',
          vi: 'Bảng câu hỏi khách hàng'
        },
        description: {
          default: 'Please fill out this questionnaire to help us serve you better',
          vi: 'Vui lòng điền vào bảng câu hỏi này để giúp chúng tôi phục vụ bạn tốt hơn'
        }
      },
      {
        id: 'kyc-form',
        name: 'kyc-form',
        title: {
          default: 'KYC Verification Form',
          vi: 'Mẫu xác minh KYC'
        },
        description: {
          default: 'Know Your Customer (KYC) verification form',
          vi: 'Mẫu xác minh Biết khách hàng của bạn (KYC)'
        }
      }
    ];
  }

  setLocale(locale) {
    this.currentLocale = locale;
    this.notifyLocaleListeners(locale);
  }

  getCurrentLocale() {
    return this.currentLocale;
  }

  onLocaleChange(listener) {
    this.localeListeners.push(listener);
    return () => {
      this.localeListeners = this.localeListeners.filter(l => l !== listener);
    };
  }

  notifyLocaleListeners(locale) {
    this.localeListeners.forEach(listener => listener(locale));
  }

  getFormsList() {
    return Promise.resolve(this.formsList);
  }

  async getFormById(id) {
    // Check cache first
    if (this.formsCache.has(id)) {
      return this.formsCache.get(id);
    }

    // Load from public directory
    try {
      const response = await fetch(`/sample-forms/${id}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load form: ${response.statusText}`);
      }
      const form = await response.json();
      this.formsCache.set(id, form);
      return form;
    } catch (error) {
      console.error('Error loading form:', error);
      throw error;
    }
  }

  submitForm(formId, data) {
    const result = {
      success: true,
      formId: formId,
      timestamp: new Date().toISOString(),
      data: data
    };

    console.log('Form submitted:', result);
    return Promise.resolve(result);
  }

  getTranslation(obj, locale = null) {
    const localeToUse = locale || this.currentLocale;
    return obj[localeToUse] || obj['default'] || '';
  }
}

// Create singleton instance
export const formService = new FormService();

export default FormService;
