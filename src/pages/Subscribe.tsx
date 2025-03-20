import { useTranslation } from "react-i18next";

function Subscribe() {
    const { t } = useTranslation();
    return (
        <div className="flex justify-center align-center">
            <div>

            
            <p className="text-lg max-w-[22rem] ml-2 sm:ml-0 leading-[2rem] mt-5 sm:max-w-[36rem] sm:leading-[2.25rem] sm:text-xl font-serif sm:mt-10">
            {t("message")}</p>
            <h2 className="mt-2 sm:mt-4 font-sans text-2xl font-bold max-w-[36rem] leading-[2.5rem] text-end">Devender Singh</h2>
            <h3 className="font-sans text-xl font-semibold text-end max-w-[36rem] leading-[2.5rem]">Creator of Today&apos;s Herald</h3>
            </div>
        </div>
    )
}

export default Subscribe