import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";
import { alegreya, sourceSans } from "./fonts";

async function getData() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRfksdbrKVE4LC_SBXQV6piq2T5TXZb-6-1kzTlLmn9Upsdz-EtABaX4T15X_Vz0zVrfwr9xPBxlc5V/pub?output=csv"
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // return new Promise<String>((resolve, reject) => {
  //   resolve(res.text());
  // });

  return res.text();
}

export default async function Home() {
  // const data = await getData();
  return (
    <main className="bg-sky-100">
      <div className="w-full h-4/5 relative">
        <div className="px-32 grid grid-rows-1 grid-cols-2">
          <div className=" py-32 flex flex-col justify-between">
            <h1
              className={`${alegreya.className} bg-gradient-to-t from-primary-800 to-primary-600 inline-block text-transparent bg-clip-text font-black text-7xl text-primary-800 [text-shadow:0px_2px_5px_#0006]`}
            >
              Kamu Bisa loh.. Menjahit Tanpa Kantong Jebol
            </h1>
            <div className={` text-3xl my-16 text-stone-800`}>
              <p className="mb-1">
                Kamu ingin{" "}
                <span className="underline decoration-solid decoration-primary-700">
                  Mesin Jahit murah
                </span>{" "}
                ?
              </p>
              <p className="mb-5">
                atau Mesin jahit anda rusak dan perlu segera di perbaiki?{" "}
              </p>
              <p>Segera hubungi kami !! buka setiap hari ;)</p>
            </div>
            <div>
              <Button
                className={`text-amber-950 bg-gradient-to-tr from-amber-500 to-amber-300 border-amber-950 border-2 border-b-4 text-2xl  font-bold py-8 px-10  box-border`}
              >
                <p>Hubungi Kami</p>
              </Button>
              <span className="inline-block w-24"></span>
              <Button className="text-amber-950 bg-transparent text-2xl py-8 px-10 border-amber-950 border-2 border-b-4 font-bold ">
                <p>Lihat-Lihat Mesin</p>
              </Button>
            </div>
          </div>

          <div>
          <Divider orientation="vertical" className="absolute"></Divider>
            <Image
              src="/hero.png"
              removeWrapper
              className="mx-auto w-4/5 my-12"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* bg-gradient-to-b from-sky-50 to-sky-100  */}
      <div className="relative z-10">
        <Card
          isBlurred
          className="absolute bg-white/50 mb-16 -top-12 right-0 left-0 mx-auto w-full max-w-screen-md h-24 "
        >
          {/* <img src="/hero.png" alt="" /> */}
          <div className="absolute flex flex-row items-center text-center  px-4 justify-evenly border-2 border-amber-950 before:hidden before:bg-white/10 w-full h-full rounded-2xl ">
            <h2 className={`${alegreya.className} flex-grow-[3] font-bold text-2xl`}>
              Sejak{" "}
              <span className="bg-gradient-to-tr from-amber-600 to-amber-400 text-transparent bg-clip-text">
                2015
              </span>
            </h2>
            <Divider orientation="vertical" className="  bg-amber-950">
            </Divider>
            <h2 className={`${alegreya.className} flex-grow-[7] font-bold text-2xl`}>
              800+ Mesin telah diperbaiki/terjual
            </h2>
            <Divider orientation="vertical" className=" bg-amber-950"></Divider>
            <h2
              className={`${alegreya.className} flex-grow-[3] font-black text-2xl bg-gradient-to-tr from-primary-600 to-primary-400 text-transparent bg-clip-text`}
            >
              MJSB
            </h2>
          </div>
        </Card>
      </div>
      <div className="relative text-center bg-sky-50 py-20">
        {/* background bulat bulat start*/}
        <div className="absolute w-36 h-36 left-24 top-36 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400"></div>
        <div className="absolute w-36 h-36 right-24 bottom-10 rounded-full bg-gradient-to-tl from-primary-600 to-primary-400"></div>

        {/* background bulat bulat end */}
        <h2
          className={`${alegreya.className} text-center mb-2 text-5xl font-black text-amber-950`}
        >
          Pengalaman Pelanggan
        </h2>
        
        <Chip
          variant="shadow"
          className="text-amber-950 bg-gradient-to-tr from-amber-500 to-amber-300 border-amber-950 border-2 font-bold"
        >
          Ulasan Google Maps
        </Chip>
        <div className="flex justify-evenly *:bg-white/50 mt-8 *:max-w-96 *:py-2 *:px-4 *:border-2 *:border-b-4 *:border-amber-950 *:h-60 *:flex *:flex-col *:justify-around">
          <Card isBlurred>
            <CardBody>
              <p>
                Recommended untuk yang lagi cari mesin jahit second dengan
                kualitas mulus, dapet harga yang cocok. penjual nya ramah,
                ngerti merk dan perbandingan mesin. Insyaallah beli disini
                amanah diajarin sampai bisa, bisa dikontak buat service pula.
              </p>
            </CardBody>
            <Divider></Divider>
            <CardFooter className="font-bold">
              <p>Rumah Jahit by insannuur</p>
            </CardFooter>
          </Card>
          <Card isBlurred>
            <CardBody>
              <p>
                Rekomend buat yg nyari mesin jahit seken.. bisa service jg,
                ownernya ramah banget. Mesin jahit berbagai jenis ada tinggal
                menyesuaikan budget. Dan dipastikan siap pakai.
              </p>
            </CardBody>
            <Divider></Divider>
            <CardFooter className="font-bold">
              <p>Septi Pertiwi</p>
            </CardFooter>
          </Card>
          <Card isBlurred>
            <CardBody>
              <p>
                Kang servis mesin portable/mesin industri/mesin jadul dan
                penjual mesin paling enaken,enak diajak ngobrol,enak ditnya soal
                mesin,dikasih saran,dikasih tips,bisa datang kerumah
              </p>
            </CardBody>
            <Divider></Divider>
            <CardFooter className="font-bold">
              <p>Ummu RayyaS</p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="text-center relative py-20">
        {/* background accent start*/}
        <div className="absolute w-24 h-64 left-56 top-36 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 -z-1"></div>
        <div className="absolute w-24 h-64 right-56 bottom-10 rounded-2xl  bg-gradient-to-tl from-amber-600 to-amber-400"></div>

        {/* background accent end */}
        <div>
          <p className="text-slate-700">Kondisi Mesin</p>
          <h3 className={`${alegreya.className} text-3xl font-bold`}>
            Apakah Ada Menjual Mesin Jahit Baru ?
          </h3>
          <Card
            className="w-2/3 mx-auto mt-8 py-2 px-4 bg-white/75 border-2  border-primary-900"
            isBlurred
          >
            <CardBody className="text-lg">
              Kami berfokus untuk menjual mesin jahit bekas yang sudah kami
              periksa dengan teliti. Setiap mesin yang kami jual sudah
              dipastikan berfungsi dengan baik dan siap dipakai, jadi Anda bisa
              mendapatkan mesin jahit berkualitas (like new) dengan harga yang
              lebih terjangkau.
            </CardBody>
          </Card>
        </div>
        <Divider className="w-1/2 mx-auto my-16"></Divider>
        <div>
          <p className="text-slate-700">Garansi Barang</p>
          <h3 className={`${alegreya.className} text-3xl font-bold`}>
            Bagaimana jika mesin yang dibeli rusak ?
          </h3>
          <Card
            isBlurred
            className="w-2/3 mx-auto mt-8 py-2 px-4 bg-white/75 border-2 border-amber-950"
          >
            <CardBody className="text-lg">
              Kami menjamin semua mesin jahit yang kami jual akan berfungsi
              dengan baik. Kami juga memberikan garansi selama 30 hari untuk
              semua barang dan perbaikan yang kami lakukan. Jika ada masalah
              selama masa garansi, kami akan memperbaikinya secara gratis. Jadi,
              anda tidak perlu khawatir.
            </CardBody>
          </Card>
        </div>
        <Divider className="w-1/2 mx-auto my-16"></Divider>
        <div>
          <p className="text-slate-700">Kondisi Mesin</p>
          <h3 className={`${alegreya.className} text-3xl font-bold`}>
            Apakah Ada Menjual Mesin Jahit Baru ?
          </h3>
          <Card
            className="w-2/3 mx-auto mt-8 py-2 px-4 bg-white/75 border-2  border-primary-900"
            isBlurred
          >
            <CardBody className="text-lg">
              Kami berfokus untuk menjual mesin jahit bekas yang sudah kami
              periksa dengan teliti. Setiap mesin yang kami jual sudah
              dipastikan berfungsi dengan baik dan siap dipakai, jadi Anda bisa
              mendapatkan mesin jahit berkualitas (like new) dengan harga yang
              lebih terjangkau.
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="bg-sky-50 py-16">
        <h2 className={`${alegreya.className} text-center text-5xl font-black`}>
          Kunjungi kami
        </h2>
        <div className="grid grid-rows-1 grid-cols-2 gap-8 py-16 px-24">
          <div className="w-1/2 mr-0 ml-auto">
            <Button
              className=" text-slate-50 w-full mb-4 flex justify-start bg-gradient-to-tr from-[#25D366] to-green-400 text-2xl py-8 px-4 border-amber-950 border-2 border-b-4 font-bold"
              startContent={
                <Image
                  as={NextImage}
                  src="/wa_white.svg"
                  width={40}
                  height={40}
                />
              }
            >
              0812-6644-2133
            </Button>
            <Button
              className=" text-slate-50 w-full mb-4 flex justify-start bg-gradient-to-tr from-[#1877F2] to-sky-500 text-2xl py-8 px-4 border-amber-950 border-2 border-b-4 font-bold"
              startContent={
                <Image
                  as={NextImage}
                  src="/fb_white.png"
                  width={40}
                  height={40}
                />
              }
            >
              Mesin Jahit Seken Batam
            </Button>
            <Button
              className=" text-slate-50 w-full flex justify-start bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-2xl py-8 px-4 border-amber-950 border-2 border-b-4 font-bold"
              startContent={
                <Image
                  as={NextImage}
                  src="/ig_white.svg"
                  width={40}
                  height={40}
                />
              }
            >
              Mesin Jahit Seken Batam
            </Button>
            <p className="text-right mt-4">
              Jl. Rindang Garden Batu Aji No.15 blok C2, Buliang, Kec. Batu Aji,
              Kota Batam, Kepulauan Riau 29424
            </p>
          </div>

          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.141549138857!2d103.97474881136158!3d1.0553296624455868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98daa3c1a2ab3%3A0xd92241c19d311839!2smesin%20jahit%20seken%20batam!5e0!3m2!1sid!2sid!4v1721545975577!5m2!1sid!2sid"
              className="w-3/4 rounded-2xl aspect-square border-4 border-amber-950"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
