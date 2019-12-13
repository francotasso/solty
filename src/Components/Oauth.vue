<template>
    <div>
    </div>
</template>

<script>
import API from "../API/API";
import axios from "axios";
export default {
    name: "Oauth",
    data() {
        return {

        }
    },
    methods: {
        checkIfLoggedIn() {
            const url = API.url.concat("/auth/check");
            axios.get(url, { withCredentials: true }).then(response => {
                const user = response.data.user;
                localStorage.setItem(
                "userFullName",
                `${user.firstName} ${user.lastName}`
                );
                localStorage.setItem("userId", user._id);
                localStorage.setItem("googleUp", true);
                this.$router.push('/products');
            });
        }
    },
    beforeMount(){
        this.checkIfLoggedIn();
    }
}
</script>

<style scoped>
    
</style>