import { defineStore } from 'pinia';

export const useHostelMsgStore = defineStore('hostelStore', {
  state: () => ({
    formData: {
      hName: '乌山旅店',
      pName: '巫山',
      around: '',
      detailMsg: '星际酒店座落于长沙核心商业及娱乐区－友谊大马路,以其优质的旅店服务,娱乐设施,客房和食府闻名,是长沙最受欢迎的旅店之一.自开业以来,旅店曾获诸多奖项殊荣,更因其独具特色的建筑和精彩纷呈的美食而备受推崇.',
      radios: '3',
      tel: '17578900987',
      address: '长沙五一大道',
    },
  }),
  actions: {
    saveFormData(data) {
      this.formData = { ...this.formData, ...data };
      localStorage.setItem('hostelFormData', JSON.stringify(this.formData));
    },
    resetFormData() {
      this.formData = {
        hName: '',
        pName: '',
        around: '',
        detailMsg: '',
        radios: '3',
        tel: '',
        address: '',
      };
      localStorage.removeItem('hostelFormData');
    },
    loadFormData() {
      const storedData = localStorage.getItem('hostelFormData');
      if (storedData) {
        this.formData = JSON.parse(storedData);
      }
    },
  }
});