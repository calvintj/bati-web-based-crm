"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Hooks
import { useCustomerDetails } from "@/hooks/customer-details/use-customer-details";

// Components
import Sidebar from "@/components/shared/sidebar";
import Navbar from "@/components/shared/navbar";
import CustomerDropdown from "@/components/customer-details/customer-id-bar";
import PortfolioPie from "@/components/customer-details/customer-portfolio";
import OptimizedPortfolio from "@/components/customer-details/customer-optimized-portfolio";
import OwnedProductTable from "@/components/customer-details/owned-products";
import RecommendationProduct from "@/components/customer-details/recommendation-products";
import QuarterlyAUM from "@/components/customer-details/quarterly-aum";
import QuarterlyFUM from "@/components/customer-details/quarterly-fum";
interface CustomerDetails {
  Priority_Private: string;
  Risk_Profile: string;
  Status_Nikah: string;
  Total_AUM: string;
  Total_FBI: string;
  Total_FUM: string;
  Usia: string;
  Vintage: string;
}
// A small reusable component to display customer detail rows.
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div className="bg-gray-700 rounded-2xl flex items-center justify-between p-2">
    <h2 className="pl-2 font-bold">{label}</h2>
    <h2 className="pr-2">
      {value !== undefined && value !== null ? value : "N/A"}
    </h2>
  </div>
);

export default function CustomerDetailsPage() {
  const searchParams = useSearchParams();
  const [customerID, setCustomerID] = useState("1");
  const [customerRisk, setCustomerRisk] = useState<string>("All");

  // Update customerID based on URL search parameter
  useEffect(() => {
    const id = searchParams?.get("customerID");
    if (id) {
      setCustomerID(id);
    }
  }, [searchParams]);

  const { data, loading } = useCustomerDetails(customerID) as unknown as {
    data: CustomerDetails;
    loading: boolean;
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar setCustomerRisk={setCustomerRisk} customerRisk={customerRisk} />

        <main className="flex flex-1 overflow-y-auto mr-2 mt-2 overscroll-contain">
          {/* Left Column */}
          <div className="flex flex-col gap-2 w-1/4 mr-2">
            <div className="rounded-2xl flex items-center justify-between p-2 bg-[#1D283A]">
              <div className="font-bold">ID Nasabah: {customerID}</div>
              <CustomerDropdown
                customerID={customerID}
                setCustomerID={setCustomerID}
              />
            </div>
            <div className="flex flex-col gap-2">
              {[
                {
                  title: "FUM",
                  value:
                    data && data.Total_FUM
                      ? `Rp ${Number(data.Total_FUM).toLocaleString("id-ID")}`
                      : "N/A",
                },
                {
                  title: "AUM",
                  value:
                    data && data.Total_AUM
                      ? `Rp ${Number(data.Total_AUM).toLocaleString("id-ID")}`
                      : "N/A",
                },
                {
                  title: "FBI",
                  value:
                    data && data.Total_FBI
                      ? `Rp ${Number(data.Total_FBI).toLocaleString("id-ID")}`
                      : "N/A",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl flex flex-col justify-center items-center text-2xl p-4 bg-[#1D283A] flex-1"
                >
                  <h1 className="font-bold">{item.title}</h1>
                  <h1>{item.value}</h1>
                </div>
              ))}
            </div>

            <div className="flex flex-col rounded-2xl gap-4 p-4 bg-[#1D283A]">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : data ? (
                <>
                  <DetailRow label="Status" value={data.Priority_Private} />
                  <DetailRow label="Usia" value={data.Usia} />
                  <DetailRow
                    label="Status Pernikahan"
                    value={data.Status_Nikah}
                  />
                  <DetailRow label="Profil Resiko" value={data.Risk_Profile} />
                  <DetailRow label="Vintage" value={data.Vintage} />
                </>
              ) : (
                <div className="text-center">No customer data available</div>
              )}
            </div>

            <div className="ml-2 font-bold">Rekomendasi</div>
            <div>
              <RecommendationProduct customerID={customerID} />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex gap-2">
              {/* Portfolio Section */}
              <div className="rounded-2xl bg-[#1D283A] flex-1">
                <PortfolioPie customerID={customerID} />
              </div>

              {/* Activity Manager Section */}
              <div className="rounded-2xl bg-[#1D283A] flex-1">
                <OptimizedPortfolio customerID={customerID} />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="rounded-2xl bg-[#1D283A] flex-1">
                <QuarterlyAUM customerID={customerID} />
              </div>
              <div className="rounded-2xl bg-[#1D283A] flex-1">
                <QuarterlyFUM customerID={customerID} />
              </div>
            </div>
            <div className="ml-2">
              <p className="font-bold">Kepemilikan Produk</p>
              <p className="text-sm text-gray-400">Kuartal Terakhir</p>
            </div>
            <div className="rounded-2xl flex-grow mb-2 bg-[#1D283A]">
              <OwnedProductTable customerID={customerID} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
