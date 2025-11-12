import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialFormState = {
  title: { default: 'New Form', vi: 'Biểu mẫu mới' },
  description: { default: '', vi: '' },
  pages: [
    {
      name: 'page1',
      title: { default: 'Page 1', vi: 'Trang 1' },
      elements: []
    }
  ]
};

export const useFormStore = create((set, get) => ({
  // Form structure
  form: { ...initialFormState },
  selectedFieldId: null,
  selectedPageIndex: 0,

  // Actions
  setFormTitle: (locale, value) => {
    set(state => ({
      form: {
        ...state.form,
        title: { ...state.form.title, [locale]: value }
      }
    }));
  },

  setFormDescription: (locale, value) => {
    set(state => ({
      form: {
        ...state.form,
        description: { ...state.form.description, [locale]: value }
      }
    }));
  },

  setSelectedPageIndex: (index) => {
    set({ selectedPageIndex: index });
    set({ selectedFieldId: null });
  },

  addField: (field) => {
    set(state => {
      const newField = {
        ...field,
        id: field.id || uuidv4()
      };

      const newPages = [...state.form.pages];
      newPages[state.selectedPageIndex].elements.push(newField);

      return {
        form: { ...state.form, pages: newPages }
      };
    });
  },

  updateField: (fieldId, updates) => {
    set(state => {
      const newPages = state.form.pages.map((page, pageIndex) => {
        if (pageIndex === state.selectedPageIndex) {
          return {
            ...page,
            elements: page.elements.map(elem =>
              elem.id === fieldId ? { ...elem, ...updates } : elem
            )
          };
        }
        return page;
      });

      return { form: { ...state.form, pages: newPages } };
    });
  },

  deleteField: (fieldId) => {
    set(state => {
      const newPages = state.form.pages.map((page, pageIndex) => {
        if (pageIndex === state.selectedPageIndex) {
          return {
            ...page,
            elements: page.elements.filter(elem => elem.id !== fieldId)
          };
        }
        return page;
      });

      return {
        form: { ...state.form, pages: newPages },
        selectedFieldId: null
      };
    });
  },

  setSelectedFieldId: (fieldId) => {
    set({ selectedFieldId: fieldId });
  },

  addPage: () => {
    set(state => {
      const pageNum = state.form.pages.length + 1;
      const newPage = {
        name: `page${pageNum}`,
        title: { default: `Page ${pageNum}`, vi: `Trang ${pageNum}` },
        elements: []
      };

      return {
        form: {
          ...state.form,
          pages: [...state.form.pages, newPage]
        },
        selectedPageIndex: state.form.pages.length,
        selectedFieldId: null
      };
    });
  },

  deletePage: (index) => {
    set(state => {
      if (state.form.pages.length === 1) return state;

      const newPages = state.form.pages.filter((_, i) => i !== index);
      const newSelectedPageIndex = Math.min(index, newPages.length - 1);

      return {
        form: { ...state.form, pages: newPages },
        selectedPageIndex: newSelectedPageIndex,
        selectedFieldId: null
      };
    });
  },

  updatePageTitle: (pageIndex, locale, value) => {
    set(state => {
      const newPages = [...state.form.pages];
      newPages[pageIndex] = {
        ...newPages[pageIndex],
        title: { ...newPages[pageIndex].title, [locale]: value }
      };

      return { form: { ...state.form, pages: newPages } };
    });
  },

  moveFieldUp: (fieldId) => {
    set(state => {
      const newPages = [...state.form.pages];
      const page = newPages[state.selectedPageIndex];
      const index = page.elements.findIndex(e => e.id === fieldId);

      if (index > 0) {
        [page.elements[index], page.elements[index - 1]] =
        [page.elements[index - 1], page.elements[index]];
      }

      return { form: { ...state.form, pages: newPages } };
    });
  },

  moveFieldDown: (fieldId) => {
    set(state => {
      const newPages = [...state.form.pages];
      const page = newPages[state.selectedPageIndex];
      const index = page.elements.findIndex(e => e.id === fieldId);

      if (index < page.elements.length - 1) {
        [page.elements[index], page.elements[index + 1]] =
        [page.elements[index + 1], page.elements[index]];
      }

      return { form: { ...state.form, pages: newPages } };
    });
  },

  resetForm: () => {
    set({
      form: { ...initialFormState },
      selectedFieldId: null,
      selectedPageIndex: 0
    });
  },

  loadForm: (formData) => {
    set({
      form: formData,
      selectedFieldId: null,
      selectedPageIndex: 0
    });
  },

  getCurrentPage: () => {
    const state = get();
    return state.form.pages[state.selectedPageIndex];
  },

  getCurrentField: () => {
    const state = get();
    const page = state.form.pages[state.selectedPageIndex];
    return page.elements.find(e => e.id === state.selectedFieldId);
  }
}));
