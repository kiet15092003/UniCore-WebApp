/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie, setCookie } from 'typescript-cookie';
import { HttpResponse } from '@/redux/models/common/HttpResponse';
import dotenv from 'dotenv';


export function http() {
    dotenv.config();
    const _baseUrl = process.env.NEXT_PUBLIC_API_BASE || '';
    const accessTokenKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || '';
    let accessToken = getCookie(accessTokenKey);
    let bearer = `Bearer ${accessToken}`;
    // const dispatch = useDispatch<AppDispatch>();

    function setToken(token: string, isAdmin: boolean) {
        accessToken = token;
        bearer = `Bearer ${token}`;
        setCookie(accessTokenKey, token, { path: '/', secure: true, sameSite: 'Strict' });
        if (isAdmin){
            setCookie('isAdmin', 'true', { path: '/', secure: true, sameSite: 'Strict' });
        } else {
            setCookie('isAdmin', 'false', { path: '/', secure: true, sameSite: 'Strict' });
        }
    }

    async function request<T>(input: RequestInfo | URL, isShowError: boolean, init?: RequestInit): Promise<HttpResponse<T>> {
        let errorText = '';
        function handleError(err: string) {
            errorText = err;
            return null;
        }

        const response = await fetch(input, init).catch(handleError);

        if (!response) {
            throw new Error(errorText);
        }

        const result: HttpResponse<T> = {
            data: {
                succeeded: false,
                errors: [],
            },
            status: 0,
            statusText: '',
            ok: false,
        };

        if (errorText) {
            result.statusText = errorText;
        }
        else {
            result.status = response.status;
            result.statusText = response.statusText;
            result.ok = response.ok;
        }

        let data: any;
        const contentType = response.headers.get('content-type');

        if (contentType?.startsWith('application/json')) {
            data = await response.json();
        }
        else {
            data = (await response.text()) as any;

            if (contentType === null && data === '') {
                data = null;
            }
        }

        result.data = data;

        // if (!result.ok) {
        //     throw new Error(result.statusText);
        // }
        return result;
    }

    return {
        setToken,
        async get<T = any>(url: string, config?: RequestInit, isShowError: boolean = true) {
            return await request<T>(`${_baseUrl}${url}`, isShowError, config || {
                method: 'GET', credentials: 'include', headers: {
                    Authorization: bearer,
                },
            });
        },
        async post<T = any>(url: string, data?: any, config?: RequestInit, isShowError: boolean = true) {
            const requestInit: RequestInit = config || {
                method: 'POST', credentials: 'include', headers: {
                    'accept': '*/*', 'Content-Type': 'application/json',
                    'Authorization': bearer,
                },
            };
            requestInit.body = JSON.stringify(data);
            return await request<T>(`${_baseUrl}${url}`, isShowError, requestInit);
        },
        async put<T = any>(url: string, data?: any, config?: RequestInit, isShowError: boolean = true) {
            const requestInit: RequestInit = config || { method: 'PUT', credentials: 'include', headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': bearer } };

            if (data) {
                requestInit.body = JSON.stringify(data);
            }
            else {
                requestInit.body = data;
            }
            return await request<T>(`${_baseUrl}${url}`, isShowError, requestInit);
        },
        async delete<T = any>(url: string, config?: RequestInit, isShowError: boolean = true) {
            return await request<T>(`${_baseUrl}${url}`, isShowError, config || { method: 'DELETE', credentials: 'include', headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': bearer } });
        },
        async uploadProductImages<T = any>(
            url: string,
            data: { ImageProductDetailFiles: FileList; ProductDetailIds: string[] },
            config?: RequestInit,
            isShowError: boolean = true
        ) {
            if (!data.ImageProductDetailFiles || data.ImageProductDetailFiles.length === 0) {
                throw new Error("No files selected.");
            }
        
            const formData = new FormData();
        
            // Lặp qua FileList để thêm từng file vào FormData
            for (let i = 0; i < data.ImageProductDetailFiles.length; i++) {
                formData.append("ImageProductDetailFiles", data.ImageProductDetailFiles[i]);
            }
        
            // Thay vì JSON.stringify, gửi từng GUID riêng lẻ
            data.ProductDetailIds.forEach((id) => {
                formData.append("ProductDetailIds", id); // Append từng GUID vào FormData
            });
        
            // Tạo requestInit
            const requestInit: RequestInit = {
                method: "POST",
                credentials: "include",
                headers: {
                    accept: "*/*",
                    Authorization: bearer,
                },
                body: formData,
            };
        
            return await request<T>(`${_baseUrl}${url}`, isShowError, requestInit);
        }
        
        
        
        
    };
}