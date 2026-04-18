import { ApiError } from "./apiError";

type ApiFetchOptions = Omit<RequestInit, "body"> & {
    body?: any;
    requireAuth?: boolean;
    tokenKey?: string; 
};

export async function apiFetch<T>(
    endpoint: string,
    options: ApiFetchOptions = {}
): Promise<T> {

    const url = `${API_BASE_URL}${endpoint}`;

    const isFormData = options.body instanceof FormData;
    const headers = new Headers(options.headers);

    if (!isFormData && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (options.requireAuth) {
        // const token = yhaan token get krna hai Local storage or any cookeis se

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    if (options.body && !isFormData) {
        config.body = JSON.stringify(options.body);
    }

    const res = await fetch(url, config);

    if (!res.ok) {
        const rawText = await res.text(); // only ONE read

        let errorData: any = null;

        try {
            errorData = JSON.parse(rawText);
        } catch {
            // not JSON, keep as text
             errorData = rawText;
        }

        // console.error("FULL API ERROR -from api.ts file :", {
        //     status: res.status,
        //     statusText: res.statusText,
        //     rawText,
        //     errorData,
        // });

// ApiError.tsx
        throw new ApiError(
            errorData?.message || rawText || `API Request Failed (${res.status})`,
            res.status,
            errorData || rawText
        );
    }

    return res.json();
}



