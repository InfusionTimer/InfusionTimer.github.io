export function useAlerts() {

    function alerts(message) {
        return alert(message);
    }
    return { alerts };

}