--
-- PostgreSQL database dump
--

-- Dumped from database version 10.13
-- Dumped by pg_dump version 10.13

-- Started on 2021-04-08 03:00:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2803 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 32823)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    title character varying(128) NOT NULL,
    cloudinary_id character varying(128) NOT NULL,
    image_url character varying(128) NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 32821)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO postgres;

--
-- TOC entry 2804 (class 0 OID 0)
-- Dependencies: 196
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- TOC entry 2670 (class 2604 OID 32826)
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- TOC entry 2795 (class 0 OID 32823)
-- Dependencies: 197
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, title, cloudinary_id, image_url) FROM stdin;
2	screenshot1	toyukf3rhonqqxsn7bex	https://res.cloudinary.com/johnte/image/upload/v1617674778/toyukf3rhonqqxsn7bex.png
4	snowtrees	kjnl8oivod7tdsmnidxf	https://res.cloudinary.com/johnte/image/upload/v1617775051/kjnl8oivod7tdsmnidxf.jpg
6	flameseeds	e12qjltzzqh7awqzz1gm	https://res.cloudinary.com/johnte/image/upload/v1617789260/e12qjltzzqh7awqzz1gm.jpg
7	specs	i7kiyiucn2mgghgx6qli	https://res.cloudinary.com/johnte/image/upload/v1617789293/i7kiyiucn2mgghgx6qli.png
8	specs23	yzvodzni7ilrqpmpn0pd	https://res.cloudinary.com/johnte/image/upload/v1617792256/yzvodzni7ilrqpmpn0pd.png
\.


--
-- TOC entry 2805 (class 0 OID 0)
-- Dependencies: 196
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 8, true);


--
-- TOC entry 2672 (class 2606 OID 32828)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


-- Completed on 2021-04-08 03:00:25

--
-- PostgreSQL database dump complete
--

