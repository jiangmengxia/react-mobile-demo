/*
 * @Description: 
 * @Author: 
 * @Date: 2019-10-25 18:05:43
 * @LastEditors: 
 * @LastEditTime: 2019-10-25 18:06:37
 */
export const androidStorage = {
    getItem: (key) => {
        if (window.androidStorage) {
            return window.androidStorage.get(key)
        }
        return window.localStorage.getItem(key)
    },
    setItem: (key, value) => {
        if (window.androidStorage) {
            window.androidStorage.set(key, value)
        }
        window.localStorage.setItem(key, value)
    },
    removeItem: (key) => {
        if (window.androidStorage) {
            window.androidStorage.removeItem(key)
        }
        window.localStorage.removeItem(key)
    },
    clear: () => {
        const clearQueue = [
            // 'TMLabraryInfo',
            // 'userInfo',
            // 'autoLogin',
            // 'chapterInfo',
            // 'lastTime',
            // 'classHistoryTestSummeryStorage',
            // 'teachingMaterialSelectStorage',
            // 'teachingMaterialLabraryStorage',
            // 'studentStudyAnalysisStorage',
        ]
        if (window.androidStorage) {
            clearQueue.forEach(key => window.androidStorage.removeItem(key))
        }
        window.localStorage.clear()
    }
}
