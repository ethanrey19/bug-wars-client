import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: '',
		user: {},
	}),
	getters: {
		// Add your getters here
	},
	actions: {
		init() {
			const currentToken = localStorage.getItem('token');
			const currentUser = localStorage.getItem('user');
			if (currentToken != null) {
				this.token = currentToken;
				axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
			}
			if (currentUser != null) {
                try {
                    this.user = JSON.parse(currentUser);
                } catch (error) {
                    this.user = {};
                    
                }
				
			}
		},
		setAuthToken(token:any) {
			this.token = token;
			localStorage.setItem('token', token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
		},
		setUser(user:any) {
			this.user = user;
			localStorage.setItem('user', JSON.stringify(user));
           
		},
		logout() {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			this.token = '';
			this.user = {};
			delete axios.defaults.headers.common['Authorization'];
		},
	},
});