import Footer from "../../components/shared/footer";
import NavBar from "../../components/shared/navbar";



const CommonLayout = ({children}: {children : React.ReactNode}) => {
    return (
        <>
           <div className="min-h-screen">
           <NavBar></NavBar> 
            <main className="mx-auto bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
                {children}
                </main>
            
            <Footer></Footer>
           </div>
        </>
    );
};

export default CommonLayout;

