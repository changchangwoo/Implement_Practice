const API_END_POINT = 'https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (url, options = {}) => {
    try {
        const fullUrl = `${API_END_POINT}${url}`;

        // Proxy URL을 사용하여 CORS 정책 우회
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const response = await fetch(proxyUrl + fullUrl, options);

        if (response.ok) {
            const json = await response.json();
            return json;
        }

        throw new Error('API 통신 실패');
    } catch (e) {
        alert(e.message);
    }
};
